import * as React from 'react'
import {connect} from 'react-redux'
import {closeDialogs} from '../Action'
import {IDialogProps} from './DialogHost'
import styles from './gameplayGuide.css'

interface ICallbackProps {
  onCloseDialogs(): void
}

type Props = ICallbackProps & IDialogProps

function GameplayGuide(props: Props) {
  Object.assign(props.drawerActionHandler, {
    current: props.onCloseDialogs,
  })

  return (
    <article className={styles.guide}>
      <h1>Gameplay guide</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Integer vitae justo eget magna fermentum iaculis. Libero nunc consequat interdum varius sit amet
        mattis. Euismod in pellentesque massa placerat duis ultricies lacus. Rutrum quisque non tellus orci ac auctor
        augue mauris. Eu scelerisque felis imperdiet proin fermentum leo vel orci porta. Facilisis magna etiam tempor
        orci eu lobortis elementum. Lobortis elementum nibh tellus molestie nunc. Consectetur lorem donec massa sapien.
        Pharetra vel turpis nunc eget lorem dolor. Adipiscing commodo elit at imperdiet dui. Rutrum quisque non tellus
        orci ac auctor augue mauris. Eleifend mi in nulla posuere sollicitudin. At ultrices mi tempus imperdiet nulla
        malesuada pellentesque elit. Varius morbi enim nunc faucibus a pellentesque sit amet. Id nibh tortor id aliquet
        lectus proin nibh nisl condimentum. Sem et tortor consequat id porta nibh venenatis cras sed.
      </p>
      <h2>About rules</h2>
      <h3>Rules, as they are</h3>
      <p>
        Ipsum dolor sit amet consectetur adipiscing elit ut aliquam purus. Nunc sed blandit libero volutpat sed cras.
        Porta non pulvinar neque laoreet suspendisse. Amet massa vitae tortor condimentum lacinia quis. Nec sagittis
        aliquam malesuada bibendum arcu vitae elementum. Sed augue lacus viverra vitae congue eu consequat ac felis.
        Ornare arcu dui vivamus arcu felis bibendum ut. Ornare lectus sit amet est placerat in egestas. Pellentesque
        elit eget gravida cum sociis natoque penatibus et magnis. Tincidunt praesent semper feugiat nibh sed pulvinar
        proin gravida. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Amet venenatis urna cursus
        eget nunc. Arcu bibendum at varius vel pharetra. Vulputate mi sit amet mauris commodo quis imperdiet massa
        tincidunt. Lectus magna fringilla urna porttitor rhoncus dolor purus non enim. Neque aliquam vestibulum morbi
        blandit cursus risus at ultrices mi.
      </p>
    </article>
  )
}

export default Object.assign(connect(
  null,
  {
    onCloseDialogs: closeDialogs,
  },
)(
  GameplayGuide,
), {
  drawerActionLabel: 'Zpět do hry',
  title: 'Jak hrát sudoku',
})
