import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import ContactAdmin from '/imports/ui/components/ContactAdmin';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Contacts } from '../../api/contact/Contacts';

class ListContactsAdmin extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>List Contacts (Admin)</Header>
          <Card.Group centered>
            {this.props.contacts.map((contact, index) => <ContactAdmin key={index} contact={contact}/>)}
          </Card.Group>
        </Container>
    );
  }
}

ListContactsAdmin.propTypes = {
  contacts: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe('ContactsAdmin');
  return {
    contacts: Contacts.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListContactsAdmin);
