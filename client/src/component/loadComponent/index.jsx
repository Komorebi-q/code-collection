import React from "react";

const loadComponent = ({ component, loading }) =>
  class Load extends React.Component {
    state = {
      Loading: <span>loading...</span>,
      Comp: null
    };

    componentDidMount() {
      if (this.hasLoadedComponent()) {
        return;
      }

      component()
        .then(module => (module.default ? module.default : module))
        .then(Component => {
          this.setState({
            Comp: Component
          });
        })
        .catch(err => {
          console.error(`cannot load Component in <LoadComponent />`);

          throw err;
        });

      if (loading) {
        this.setState({
          Loading: loading
        });
      }
    }

    render() {
      const { Comp, Loading } = this.state;

      return Comp ? <Comp /> : Loading;
    }

    hasLoadedComponent = () => {
      return this.state.Comp !== null;
    };
  };

export default loadComponent;
