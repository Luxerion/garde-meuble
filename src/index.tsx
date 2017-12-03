import * as React from "react";
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import { ApolloProvider, createNetworkInterface, ApolloClient, /*graphql*/} from 'react-apollo';
import ClientList from './ClientList';
import ClientForm from './ClientForm';
import Client from './Client';

const networkInterface = createNetworkInterface({
    uri: 'http://gm.the-patriots.com/graphql'
});

const client = new ApolloClient({
    networkInterface
});

class Home extends React.Component<any, any>{
    render(){
        return (
            <div className="client-list">
                <ClientForm/>
                <ClientList/>
            </div>
        )
    }
}

ReactDOM.render((
    <BrowserRouter>
        <ApolloProvider client = {client}>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path="/clients/:id" render={props => (<Client id={props.match.params.id}/>)}/>
            </Switch>
        </ApolloProvider>
    </BrowserRouter>
), document.getElementById('root'));