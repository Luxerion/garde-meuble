import * as React from 'react';
import {graphql, gql} from "react-apollo";
import { Link } from 'react-router-dom';

class ClientList extends React.Component<any, {}>{

    render(){
        const {data} = this.props;
        if (data.loading)
            return (<p>Loading...</p>);
        if (data.error)
            return (<p>{data.error.toString()}</p>);
        return(
            <div>
                <ul>
                    {data.clients.map(client => (
                        <a key={client.id}><Link to={"/users/"+client.id}>{client.firstname} {client.lastname}</Link></a>
                    ))}
                </ul>
            </div>
        )
    }
}

const ClientListWithData = graphql(gql`{
    clients {
        lastname
        firstname
        id
    }
    }`)(ClientList);

export default ClientListWithData;