import React from 'react';

class InputField extends React.Component {
    constructor(props) {
        super(props);

        var value = props.value ? props.value : null;

        // Custom rule added for attribute field 'value'.
        // If You pass a function into defaultValue method of ra.field object,
        // it will be executed each time React renders this input field
        if (typeof value === 'function'){
            value = value()
        };
        // value = typeof value === 'function' ? value() : value;
        this.props.updateField(this.props.name, value);
        // END OF CUSTOM RULE

        this.state = { value: value };
    }

    onChange(e) {
        const value = e.target.value;
        this.setState({ value });
        this.props.updateField(this.props.name, value);
    }

    render() {

        const attributes = {
            type: this.props.type ? this.props.type : 'text',
            value: this.state.value,
            autoFocus: !!this.props.autoFocus,
            name: this.props.name,
            id: this.props.name,
            onChange: this.onChange.bind(this)
        };

        return <input {...attributes} className="form-control" />;
    }
}

InputField.propTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.any,
    type: React.PropTypes.string,
    updateField: React.PropTypes.func,
    autoFocus: React.PropTypes.bool
};

require('../../autoloader')('InputField', InputField);

export default InputField;
