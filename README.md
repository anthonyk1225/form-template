## Setup

Clone the repo into your project. This code relies on two packages. [react-native-elements](https://www.npmjs.com/package/react-native-elements) and [prop-types](https://www.npmjs.com/package/prop-types).

If these aren't in your project's dependencies already, do the following.

```
$ npm i --save react-native-elements
$ npm i --save prop-types
```

Delete the `README` and `example` folder.

## Create a new form

To create a new form, add a new object into `types.js`. There are 3 examples there for you already. 

When adding in a new `formType`, name it anything you want. The value of the key must be an array. For each object within the array, this will represent an input on a new row within the form. How to have multiple inputs on one row will be mentioned below.

Here's an example of a new form that you can create within `types.js`.

```
export default {
    ...otherTypes
    creditCard: [ // my new formType
        {},
    ],
    otherTypes...
};
```

There are a few things that you will be required to include for each input.

| name          | description           | type  |
| ------------- | ------------- | ------------- |
| ref | This is the input element's reference. It allows us to focus on and store the value of the input. | string |
| validationKey | when a form's submit button is pressed, a pipeline of functions will be ran. Specific validation functions will be ran depending on the key. | string |

Optional fields include
| name          | description           | type  |
| ------------- | ------------- | ------------- |
| nextRef | In order to focus on the next input of the form, we need to store that input's ref. | string |

## Support

Currently only supports `react-native`. Extending to `react` in the future.