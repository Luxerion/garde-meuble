import * as React from 'react';
import {graphql} from "react-apollo";
import * as mutation from './mutation'

class _ClientForm extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            address: "",
            phone: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const {submit} = this.props;
        const onSubmit = (e) => {
            e.preventDefault();
            const {firstname, lastname, address, phone} = this.state;
            submit({firstname, lastname, address, phone})
        };
        return (
            <div>
                <form onSubmit={onSubmit}>
                    Nom
                    <input value={this.state.lastname} type="text" name="lastname" onChange={this.handleChange}/>
                    Prénom
                    <input value={this.state.firstname} type="text" name="firstname" onChange={this.handleChange}/>
                    Adresse
                    <input value={this.state.address} type="text" name="address" onChange={this.handleChange}/>
                    Téléphone
                    <input value={this.state.phone} type="text" name="phone" onChange={this.handleChange}/>
                    <input type="submit" value="Créer client"/>
                </form>
            </div>
        )
    }
}

const ClientForm: any = graphql(mutation.createClient, {
    props({ ownProps, mutate })
    {
        return {
            submit({ firstname, lastname, address, phone })
            {
                return mutate!({
                    variables: { firstname, lastname, address, phone },
                });
            },
        };
    },
})(_ClientForm);

export default ClientForm;