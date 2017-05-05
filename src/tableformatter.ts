export class Row {
    public cells: string[];

    public constructor(cells: string[]) {
        this.cells = cells;
    }

    /**
     * Format the specific row based on the column widths and separator.
     * 
     * @param colWidths     The column widths
     * @param sep           The separator
     */
    public formatRow(colWidths: number[], sep: string): string {
        var s = "";
        var isFirst = true;
        var cellId = 0;

        for (var cell of this.cells) {
            if (! isFirst) {
                s += sep;
                isFirst = false;
            }

            s += cell + (" ".repeat(colWidths[cellId] - cell.length)) + sep;
            cellId++;
        }

        return s;
    }
}

export class Table {
    private rows: Row[];

    public constructor(rows: Row[]) {
        this.rows = rows;
    }

    /**
     * Parse takes a tabbed separated string and converts it into a table.
     * @param str   The string to parse.
     */
    static parse(str: string): Table {
        return new Table(str.split(/\n/)
            .map(s => s.trim())
            .map(rowStr => rowStr.split(/\t/)
                .map(cellStr => cellStr.trim()))
            .map(cellStrs => new Row(cellStrs)));
    }

    /**
     * Formats the table as a reStructuredText simple table.
     */
    public format(): string {
        var s: string = "";
        var isHeader = true;

        let colWidths = this.calcColWidths();

        for (var row of this.rows) {
            if (isHeader) {
                s += this.formatRule(colWidths, "  ") + "\n";
                s += row.formatRow(colWidths, "  ").trim() + "\n";
                s += this.formatRule(colWidths, "  ") + "\n";
                isHeader = false;
            } else {
                s += row.formatRow(colWidths, "  ").trim() + "\n";
            }
        }

        s += this.formatRule(colWidths, "  ")
        return s;
    }

    private formatRule(colWidths: number[], sep: string): string {
        return colWidths.map(len => "=".repeat(len)).join(sep);
    }

    /**
     * Calculates the column lengths such that each column can fill
     * the largest cell.
     */
    private calcColWidths(): number[] {
        var widths: number[] = [];

        // Initialize the widths
        for (var i = 0; i < this.maxCols(); i++) {
            widths.push(0);
        }

        for (var row of this.rows) {
            for (var i = 0; i < row.cells.length; i++) {
                widths[i] = Math.max(widths[i], row.cells[i].length);
            }
        }

        return widths;
    }

    /**
     * Return the maximum number of columns.
     */
    private maxCols(): number {
        return this.rows
            .map(row => row.cells.length)
            .reduce((acc, len) => Math.max(acc, len), 0);
    }
}
