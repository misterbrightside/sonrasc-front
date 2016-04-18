import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export default function requireAuthentication(Component) {

  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth();
    }

    checkAuth() {
      if (!this.props.isAuthenticated) {
        let redirectAfterLogin = this.props.location.pathname;
        this.props.dispatch(push("/build/"));
      }
    }

    render() {
      return (
        <div>
        {this.props.isAuthenticated === true
          ? <Component {...this.props}/>
          : null
        }
        </div>
      )

    }
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: state.authenication.isAuthenticated
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
};
