import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

// Ranking.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   history: PropTypes.shape({
//     push: PropTypes.func.isRequired,
//   }).isRequired,
//   name: PropTypes.string.isRequired,
//   email: PropTypes.string.isRequired,
//   score: PropTypes.number.isRequired,
//   assertions: PropTypes.number.isRequired,
// };

export default connect(mapStateToProps)(Feedback);
