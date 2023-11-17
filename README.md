# Unit Converter
Create a web app that can convert between different units. 
The app should give users the ability to add conversion facts. A conversion fact describes what ratio is used to convert from one unit to another.
A fact has three parts: a from unit, a to unit, and a ratio. For example, { from: 'meter', to: 'centimeter', ratio: 100 }. 
Users can add as many facts as they wish.
After adding facts, users can input two units and get the correct conversion between them.
For example, after adding the fact { from: 'meter', to: 'centimeter', ratio: 100 }, a user can input a query like { from: 'meter', to: 'centimeter', value: 34 }, press a button, and see the response 3400.

The user interface for collecting facts can be a simple group of text boxes and an 'Add' button. Likewise, the UI for a conversion query can be simple inputs and a 'Convert' button.

We have stubbed some redux actions that your app should dispatch when adding facts or converting units. We have also provided type definitions for Fact and Query. You can find these in src/features/unit-converter/converterSlice.
Tests will use these actions and types to validate your app's functionality. Other than that, feel free to make any changes to the starter code provided.

## Test cases
Here are some other examples to think about as you work through the app:

### Test case 1
Facts:
{ from: 'ft', to: 'in', ratio: 12 }

Query:
{ from: 'ft', to: 'in', value: 1 }

Output:
12

### Test case 2
Facts:
{ from: 'm', to: 'ft', ratio: 3.28 }
{ from: 'ft', to: 'in', ratio: 12 }
{ from: 'hr', to: 'min', ratio: 60 }

Query:
{ from: 'in', to: 'hr', value: 1 }

Output:
Not convertible

### Test case 3
Facts:
{ from: 'm', to: 'ft', ratio: 3.28 }
{ from: 'ft', to: 'in', ratio: 12 }
{ from: 'hr', to: 'min', ratio: 60 }

Query:
{ from: 'm', to: 'in', value: 2 }

Output:
78.72
