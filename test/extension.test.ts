//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as myExtension from '../src/extension';
import * as tf from '../src/tableformatter';

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", () => {

    // Defines a Mocha unit test
    test("Something 1", () => {
        assert.equal(-1, [1, 2, 3].indexOf(5));
        assert.equal(-1, [1, 2, 3].indexOf(0));
    });
});

suite("Table Formatter tests", () => {

    // Test a table format
    test("Test format", () => {
        let table = new tf.Table([
            new tf.Row([ "Wind", "Baring", "Description" ]),
            new tf.Row([ "North", "0", "The North wind Blows" ]),
            new tf.Row([ "South", "180", "The South wind flows" ]),
            new tf.Row([ "East", "90", "Wind comes from the east" ]),
            new tf.Row([ "West", "270", "And travels to the west" ]),
        ]);

        assert.equal(`
=====  ======  ========================
Wind   Baring  Description
=====  ======  ========================
North  0       The North wind Blows
South  180     The South wind flows
East   90      Wind comes from the east
West   270     And travels to the west
=====  ======  ========================`.trim(), table.format());
    })

    test("Test table parse", () => {
        let table = tf.Table.parse("Hello\tWorld\nOf  \tTables")
        assert.equal(table.format(), `
=====  ======
Hello  World
=====  ======
Of     Tables
=====  ======`.trim());
    })
});