import {gql, useSubscription} from '@apollo/client';


const MESSAGES_SUBSCRIPTION = gql `
    subscription MessageCreated {
        messageCreated {
            text
            createdBy
        }
    }
`

const Messages = () => {

    const {data, loading} = useSubscription(
        MESSAGES_SUBSCRIPTION, 
        {
            onSubscriptionData: (data) =>{
                const message = data.subscriptionData.data.messageCreated;
                console.log(message);
            }
        }
    )

    return(
        <div>Messages!!!</div>
    )
}

export default Messages;