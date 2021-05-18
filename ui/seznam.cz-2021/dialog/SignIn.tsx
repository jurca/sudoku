import * as React from 'react'
import {connect} from 'react-redux'
import {createSelector, createStructuredSelector} from 'reselect'
import * as Limits from '../../../conf/Limits'
import {leaveGame, showDialog, signIn} from '../Action'
import PrimaryActionButton from '../reusable/PrimaryActionButton'
import {startedGamesSelector} from '../selectors'
import {IState} from '../state'
import Dialog from './Dialog'
import {IDialogProps} from './DialogHost'
import SignInIllustration from './sign-in.svg'
import styles from './signIn.css'

interface IDataProps {
  signInRequired: boolean
}

interface ICallbackProps {
  onContinue(): void
  onLeaveGame(): void
  onSignIn(): void
}

type Props = IDataProps & ICallbackProps & IDialogProps

function SignIn(props: Props) {
  return (
    <div className={styles.signIn}>
      <div className={styles.illustration} onClick={props.onSignIn}>
        <SignInIllustration/>
      </div>
      {props.signInRequired ?
        <p className={styles.text}>
          Dosáhli jste maximálního počtu her pro nepřihlášeného hráče. Pokud chcete hrát dále, je nutné se přihlásit.
        </p>
      :
        <p className={styles.text}>
          Blížíte se maximálnímu počtu her pro nepřihlášeného hráče. Pokud chcete hrát dále, bude nutné se přihlásit.
        </p>
      }
      <div className={styles.buttons}>
        {props.signInRequired ?
          <PrimaryActionButton onAction={props.onLeaveGame}>
            Opustit hru
          </PrimaryActionButton>
        :
          <PrimaryActionButton onAction={props.onContinue}>
            Pokračovat
          </PrimaryActionButton>
        }
        <PrimaryActionButton onAction={props.onSignIn}>
          Přihlásit se
        </PrimaryActionButton>
      </div>
    </div>
  )
}

export default Object.assign(connect<IDataProps, ICallbackProps, {}, IState>(
  createStructuredSelector({
    signInRequired: createSelector(
      startedGamesSelector,
      startedGames => startedGames >= Limits.UNAUTHENTICATED_GAMES_LIMIT,
    ),
  }),
  {
    onContinue: showDialog.bind(null, {dialog: Dialog.NEW_GAME, stack: false}),
    onLeaveGame: leaveGame,
    onSignIn: signIn,
  },
)(
  SignIn
), {
  nonCloseable: true,
})
