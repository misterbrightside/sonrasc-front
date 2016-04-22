import Register from '../../components/Login/Register';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Colors from 'material-ui/lib/styles/colors';

const isUsernameValidAndAvailable = (registration) => {

  if (!registration.username.valid || registration.username.length > 0) return {
    text: "Invalid Username",
    style: {color: Colors.red500}
  };

  else if (registration.usernameAvailable === 1) return {
    text: "Username Available",
    style: {color: Colors.green500 }
  };

  else if (registration.usernameAvailable === -1) return {
    text: "Username Unavailable",
    style: {color: Colors.red500 }
  };

  else return {
    text: "",
    style: {}
  }
};

const isBusinessValidAndAvailable = (registration) => {
  if (registration.businessAvailable === -1) return {
    text: "Business Name Unavailable",
    style: {color: Colors.green500 }
  }
  else return {
    text: "",
    style: {}
  }
}

const checkIfEnableded = (registration) => {
  console.log(registration);
  return !(registration.usernameAvailable === 1 && registration.username.valid);
};

const handleUsernameChange = (dispatch, value) => {
  dispatch(actions.registerActions.setField('username', value));
  dispatch(actions.registerActions.untouchUsername());

  let usernameRegex = /^[a-zA-Z0-9]+$/;
  if (!value.match(usernameRegex)) dispatch(actions.registerActions.invalidField('username', value));
};

const mapStateToProps = (state, ownProps) => {
  const registration = state.Authenication.registration;
  const isUsernameForUse = isUsernameValidAndAvailable(registration);
  const isBusinessForUse = isBusinessValidAndAvailable(registration);

  return {
    usernameFieldStyle: isUsernameForUse.style,
    usernameText: isUsernameForUse.text,
    busiessFieldStyle: isBusinessForUse.style,
    businessText: isBusinessForUse.text,
    registrationButtonEnabled: checkIfEnableded(state.Authenication.registration),
    usernameValue: registration.username.value
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRegister: (user, pass, data) => dispatch(actions.registerActions.registerUser(user, pass, data)),
    onUsernameChange: (value) => dispatch(actions.registerActions.checkIfUsernameAvailable(value)),
    onUsernameValueChange: (value) => handleUsernameChange(dispatch, value),
    onBusinessChange: (value) => dispatch(actions.registerActions.checkIfBusinessAvailable(value))
  }
};

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

export default RegisterContainer;
