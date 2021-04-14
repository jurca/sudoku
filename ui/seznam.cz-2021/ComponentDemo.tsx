import * as React from 'react'
import Difficulty from '../../conf/Difficulty'
import {hierarchicalCellsSelector, HierarchicalMatrix} from '../../game/selectors'
import {DEFAULT_STATE} from '../../game/state'
import BackgroundPattern from './blocks/BackgroundPattern'
import GameBoard, {CssClassNames as BoardClassNames} from './blocks/GameBoard'
import GameBoardBlock, {CssClassNames as BlockClassNames} from './blocks/GameBoardBlock'
import GameBoardCell, {CssClassNames as CellClassNames} from './blocks/GameBoardCell'
import GameDesk from './blocks/GameDesk'
import GameDeskFooter from './blocks/GameDeskFooter'
import GameDeskHeader from './blocks/GameDeskHeader'
import InputKeyboard, {CssClassNames as InputKeysClassNames, KEY_VALUE_ATTRIBUTE} from './blocks/InputKeyboard'
import InputModeSwitch, {CssClassNames as InputModeClassNames, InputMode} from './blocks/InputModeSwitch'
import SettingsListItem from './blocks/SettingsListItem'
import Dialog from './reusable/Dialog'
import DialogHost from './reusable/DialogHost'
import Drawer from './reusable/Drawer'
import Icon, {IconType} from './reusable/Icon'
import IconButton from './reusable/IconButton'
import PhoneUIHeader from './reusable/PhoneUIHeader'
import PrimaryActionButton from './reusable/PrimaryActionButton'
import Switch from './reusable/Switch'
import TabSwitcher from './reusable/TabSwitcher'

const NOOP = () => undefined

export default function ComponentDemo() {
  return (
    <div style={{width: '100%', height: '100vh', overflow: 'auto'}}>
      <h2>Reusable components</h2>

      <ComponentWrapper style={{width: '50vw', height: '50vh'}}>
        <DialogHost>
          Dialog host
        </DialogHost>
      </ComponentWrapper>
      <ComponentWrapper style={{width: '50vw', height: '50vh', background: 'rgba(0, 0, 0, 0.4)'}}>
        <Dialog isNested={false}>
          Dialog
        </Dialog>
      </ComponentWrapper>
      <ComponentWrapper style={{width: '50vw', height: '50vh', background: 'rgba(0, 0, 0, 0.4)'}}>
        <Dialog isNested={true} title="Settings">
          Dialog
        </Dialog>
      </ComponentWrapper>
      <ComponentWrapper style={{width: 48, height: 48}}>
        <Icon icon={IconType.ARROW_LEFT}/>
      </ComponentWrapper>
      <ComponentWrapper style={{width: 48, height: 48}}>
        <Icon icon={IconType.CLOSE}/>
      </ComponentWrapper>
      <ComponentWrapper style={{width: 48, height: 48}}>
        <Icon icon={IconType.GEAR}/>
      </ComponentWrapper>
      <ComponentWrapper>
        <IconButton icon={IconType.CLOSE}/>
      </ComponentWrapper>
      <ComponentWrapper>
        <IconButton icon={IconType.GEAR}>
          Settings
        </IconButton>
      </ComponentWrapper>
      <ComponentWrapper>
        <PrimaryActionButton>
          New game
        </PrimaryActionButton>
      </ComponentWrapper>
      <ComponentWrapper style={{width: '50vw', height: '50vh', background: 'rgba(0, 0, 0, 0.4)'}}>
        <Drawer title="Settings" isNested={false} actionLabel="Back to game">
          Drawer
        </Drawer>
      </ComponentWrapper>
      <ComponentWrapper style={{width: '51px'}}>
        <Switch/>
      </ComponentWrapper>
      <ComponentWrapper>
        <PhoneUIHeader>
          Sudoku
        </PhoneUIHeader>
      </ComponentWrapper>
      <ComponentWrapper>
        <TabSwitcher
          name="tabs-demo"
          tabs={[{id: 'a', label: 'Easy'}, {id: 'b', label: 'Medium'}, {id: 'c', label: 'Hard'}]}
          defaultSelectedTabId="b"
        />
      </ComponentWrapper>

      <h2>Blocks components</h2>

      <ComponentWrapper style={{width: '50vw', height: '50vh'}}>
        <BackgroundPattern/>
      </ComponentWrapper>
      <ComponentWrapper>
        <SettingsListItem
          leftContent="Auto-complete game"
          rightContent={<div style={{width: '51px'}}><Switch/></div>}
        />
      </ComponentWrapper>
      <ComponentWrapper>
        <GameDeskHeader
          difficulty={Difficulty.MEDIUM}
          gameStart={{logicalTimestamp: performance.now()}}
          breaks={[]}
          gameEnd={null}
          onOpenSettings={NOOP}
        />
      </ComponentWrapper>
      <ComponentWrapper>
        <GameDeskFooter onNewGame={NOOP} onPause={NOOP} onUndo={NOOP} onHelp={NOOP}/>
      </ComponentWrapper>
      <ComponentWrapper style={{width: '90vw', height: '50vh'}}>
        <GameDesk
          difficulty={Difficulty.MEDIUM}
          gameStart={{logicalTimestamp: performance.now()}}
          breaks={[]}
          gameEnd={null}
          onOpenSettings={NOOP}
          onNewGame={NOOP}
          onPause={NOOP}
          onUndo={NOOP}
          onHelp={NOOP}
          onDeselectCell={NOOP}
        >
          <h1 style={{marginTop: 0}}>Game desk</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Integer vitae justo eget magna fermentum iaculis. Libero nunc consequat interdum varius
            sit amet mattis. Euismod in pellentesque massa placerat duis ultricies lacus. Rutrum quisque non tellus orci
            ac auctor augue mauris. Eu scelerisque felis imperdiet proin fermentum leo vel orci porta. Facilisis magna
            etiam tempor orci eu lobortis elementum. Lobortis elementum nibh tellus molestie nunc. Consectetur lorem
            donec massa sapien. Pharetra vel turpis nunc eget lorem dolor. Adipiscing commodo elit at imperdiet dui.
            Rutrum quisque non tellus orci ac auctor augue mauris. Eleifend mi in nulla posuere sollicitudin. At
            ultrices mi tempus imperdiet nulla malesuada pellentesque elit. Varius morbi enim nunc faucibus a
            pellentesque sit amet. Id nibh tortor id aliquet lectus proin nibh nisl condimentum. Sem et tortor consequat
            id porta nibh venenatis cras sed.
          </p>
          <p>
            Ipsum dolor sit amet consectetur adipiscing elit ut aliquam purus. Nunc sed blandit libero volutpat sed
            cras. Porta non pulvinar neque laoreet suspendisse. Amet massa vitae tortor condimentum lacinia quis. Nec
            sagittis aliquam malesuada bibendum arcu vitae elementum. Sed augue lacus viverra vitae congue eu consequat
            ac felis. Ornare arcu dui vivamus arcu felis bibendum ut. Ornare lectus sit amet est placerat in egestas.
            Pellentesque elit eget gravida cum sociis natoque penatibus et magnis. Tincidunt praesent semper feugiat
            nibh sed pulvinar proin gravida. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Amet
            venenatis urna cursus eget nunc. Arcu bibendum at varius vel pharetra. Vulputate mi sit amet mauris commodo
            quis imperdiet massa tincidunt. Lectus magna fringilla urna porttitor rhoncus dolor purus non enim. Neque
            aliquam vestibulum morbi blandit cursus risus at ultrices mi.
          </p>
          <p>
            Eu consequat ac felis donec et odio pellentesque diam. Id diam vel quam elementum pulvinar. Eget magna
            fermentum iaculis eu non diam phasellus vestibulum lorem. Nunc mi ipsum faucibus vitae aliquet nec
            ullamcorper. Tortor aliquam nulla facilisi cras. Est pellentesque elit ullamcorper dignissim cras. Arcu dui
            vivamus arcu felis bibendum. In mollis nunc sed id semper risus in hendrerit. Non enim praesent elementum
            facilisis. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere morbi. Commodo sed egestas
            egestas fringilla phasellus faucibus. At ultrices mi tempus imperdiet. Volutpat blandit aliquam etiam erat
            velit scelerisque in. Congue quisque egestas diam in arcu cursus.
          </p>
        </GameDesk>
      </ComponentWrapper>
      <ComponentWrapper style={{width: 40, height: 40, color: '#fff2f2'}}>
        <GameBoardCell onAction={NOOP}></GameBoardCell>
      </ComponentWrapper>
      <ComponentWrapper style={{width: 40, height: 40, color: '#f5dcdc'}}>
        <GameBoardCell onAction={NOOP}>7</GameBoardCell>
      </ComponentWrapper>
      <ComponentWrapper style={{width: 40, height: 40, color: '#f2b6b6'}}>
        <GameBoardCell onAction={NOOP}>{IconType.GEAR}</GameBoardCell>
      </ComponentWrapper>
      <ComponentWrapper style={{width: 40, height: 40, color: '#d98282'}}>
        <GameBoardCell onAction={NOOP}>{[
          [null, '2', '3'],
          ['4', null, null],
          [null, null, '9'],
        ]}</GameBoardCell>
      </ComponentWrapper>
      <ComponentWrapper id="inner-block" style={{width: 116, height: 116, color: '#a0a0a0'}}>
        <GameBoardBlock>{[
          [
            <GameBoardCell onAction={NOOP}>1</GameBoardCell>,
            <GameBoardCell onAction={NOOP}>2</GameBoardCell>,
            <GameBoardCell onAction={NOOP}>3</GameBoardCell>,
          ],
          [
            <GameBoardCell onAction={NOOP}>4</GameBoardCell>,
            <GameBoardCell onAction={NOOP}>5</GameBoardCell>,
            <GameBoardCell onAction={NOOP}>6</GameBoardCell>,
          ],
          [
            <GameBoardCell onAction={NOOP}>7</GameBoardCell>,
            <GameBoardCell onAction={NOOP}>8</GameBoardCell>,
            <GameBoardCell onAction={NOOP}>9</GameBoardCell>,
          ],
        ]}</GameBoardBlock>
        <style>{`
          #inner-block .game-board-cell {
            color: #fff2f2;
          }
        `}</style>
      </ComponentWrapper>
      <ComponentWrapper id="outer-block" style={{width: 350, height: 350, color: '#4c1e1e'}}>
        <GameBoardBlock>{[
          [
            <GameBoardBlock>{[
              [
                <GameBoardCell onAction={NOOP}>1</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>2</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>3</GameBoardCell>,
              ],
              [
                <GameBoardCell onAction={NOOP}>4</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>5</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>6</GameBoardCell>,
              ],
              [
                <GameBoardCell onAction={NOOP}>7</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>8</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>9</GameBoardCell>,
              ],
            ]}</GameBoardBlock>,
            <GameBoardBlock>{[
              [
                <GameBoardCell onAction={NOOP}>1</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>2</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>3</GameBoardCell>,
              ],
              [
                <GameBoardCell onAction={NOOP}>4</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>5</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>6</GameBoardCell>,
              ],
              [
                <GameBoardCell onAction={NOOP}>7</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>8</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>9</GameBoardCell>,
              ],
            ]}</GameBoardBlock>,
            <GameBoardBlock>{[
              [
                <GameBoardCell onAction={NOOP}>1</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>2</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>3</GameBoardCell>,
              ],
              [
                <GameBoardCell onAction={NOOP}>4</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>5</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>6</GameBoardCell>,
              ],
              [
                <GameBoardCell onAction={NOOP}>7</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>8</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>9</GameBoardCell>,
              ],
            ]}</GameBoardBlock>,
          ],
          [
            <GameBoardBlock>{[
              [
                <GameBoardCell onAction={NOOP}>1</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>2</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>3</GameBoardCell>,
              ],
              [
                <GameBoardCell onAction={NOOP}>4</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>5</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>6</GameBoardCell>,
              ],
              [
                <GameBoardCell onAction={NOOP}>7</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>8</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>9</GameBoardCell>,
              ],
            ]}</GameBoardBlock>,
            <GameBoardBlock>{[
              [
                <GameBoardCell onAction={NOOP}>1</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>2</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>3</GameBoardCell>,
              ],
              [
                <GameBoardCell onAction={NOOP}>4</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>5</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>6</GameBoardCell>,
              ],
              [
                <GameBoardCell onAction={NOOP}>7</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>8</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>9</GameBoardCell>,
              ],
            ]}</GameBoardBlock>,
            <GameBoardBlock>{[
              [
                <GameBoardCell onAction={NOOP}>1</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>2</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>3</GameBoardCell>,
              ],
              [
                <GameBoardCell onAction={NOOP}>4</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>5</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>6</GameBoardCell>,
              ],
              [
                <GameBoardCell onAction={NOOP}>7</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>8</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>9</GameBoardCell>,
              ],
            ]}</GameBoardBlock>,
          ],
          [
            <GameBoardBlock>{[
              [
                <GameBoardCell onAction={NOOP}>1</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>2</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>3</GameBoardCell>,
              ],
              [
                <GameBoardCell onAction={NOOP}>4</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>5</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>6</GameBoardCell>,
              ],
              [
                <GameBoardCell onAction={NOOP}>7</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>8</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>9</GameBoardCell>,
              ],
            ]}</GameBoardBlock>,
            <GameBoardBlock>{[
              [
                <GameBoardCell onAction={NOOP}>1</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>2</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>3</GameBoardCell>,
              ],
              [
                <GameBoardCell onAction={NOOP}>4</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>5</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>6</GameBoardCell>,
              ],
              [
                <GameBoardCell onAction={NOOP}>7</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>8</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>9</GameBoardCell>,
              ],
            ]}</GameBoardBlock>,
            <GameBoardBlock>{[
              [
                <GameBoardCell onAction={NOOP}>1</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>2</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>3</GameBoardCell>,
              ],
              [
                <GameBoardCell onAction={NOOP}>4</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>5</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>6</GameBoardCell>,
              ],
              [
                <GameBoardCell onAction={NOOP}>7</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>8</GameBoardCell>,
                <GameBoardCell onAction={NOOP}>9</GameBoardCell>,
              ],
            ]}</GameBoardBlock>,
          ],
        ]}</GameBoardBlock>
        <style>{`
          #outer-block .game-board-block .game-board-block {
            color: #a0a0a0;
          }

          #outer-block .game-board-cell {
            color: #f2b6b6;
          }
        `}</style>
      </ComponentWrapper>
      <ComponentWrapper
        id="input-keyboard"
        style={{boxSizing: 'border-box', width: '100%', maxWidth: 440, color: '#4c411f'}}
      >
        <InputKeyboard onAction={NOOP}/>
        <style>{`
          #input-keyboard .game-board-cell {
            color: #f5dcdc;
          }

          #input-keyboard .input-keyboard__separator {
            color: #a0a0a0;
          }
        `}</style>
      </ComponentWrapper>
      <ComponentWrapper id="input-mode" style={{boxSizing: 'border-box', width: '100%', maxWidth: 118}}>
        <InputModeSwitch
          name="inputMode"
          defaultMode={InputMode.NOTES}
          onModeChange={NOOP}
        />
        <style>{`
          #input-mode .input-mode-switch {
            color: #000000;
          }

          #input-mode .input-mode-switch__mode {
            color: #fff2f2;
          }

          #input-mode :checked + .input-mode-switch__mode {
            color: #d98282;
          }

          #input-mode .input-mode-switch__icon {
            color: #000000;
          }

          #input-mode .input-mode-switch__separator {
            color: #a0a0a0;
          }
        `}</style>
      </ComponentWrapper>
      <ComponentWrapper id="game-board" style={{boxSizing: 'border-box', width: '100%', maxWidth: 442}}>
        <GameBoard
          gameState={getDemoGame()}
          selectedCell={getDemoGame()[1][0][1][2]}
          defaultInputMode={InputMode.INPUT}
          inputModeSwitchName="gameBoardInputModeSwitch"
          onCellAction={NOOP}
          onInput={NOOP}
          onInputModeChange={NOOP}
        />
        <style>{`
          /*
            Before anyone asks: We are targetting compatibility with legacy baked-in WebView in Android 5, that's why
            we cannot use custom CSS properties (AKA CSS variables) :(. Using currentColor instead offers *some* level
            of similar abstraction.
           */

          #game-board .${BoardClassNames.MATRIX} {
            color: #4d1f1f;
          }

          #game-board .${BlockClassNames.ROOT} {
            color: #4d1f1f;
          }

          #game-board .${BlockClassNames.ROOT} .${BlockClassNames.ROOT} {
            color: #a0a0a0;
          }

          #game-board .${CellClassNames.ROOT} {
            color: #fff2f2;
          }

          #game-board .${CellClassNames.CONTENT} {
            color: #4d1f1f;
          }

          #game-board .${BoardClassNames.PRE_FILLED_CELL} {
            color: #f2dada;
          }

          #game-board .${BoardClassNames.CELL_WITH_NOTES} {
            color: #cfe6e6;
          }

          #game-board .${BoardClassNames.HIGHLIGHTED_CELL} {
            color: #f2b6b6;
          }

          #game-board .${BoardClassNames.CELL_MATCHING_SELECTED_CELL} {
            color: #d98282;
          }

          #game-board .${BoardClassNames.SELECTED_CELL} {
            color: #d98282;
          }

          #game-board .${InputKeysClassNames.ROOT} {
            color: #4d1f1f;
          }

          #game-board .${InputKeysClassNames.KEY}[${KEY_VALUE_ATTRIBUTE}='2'] .${CellClassNames.ROOT} {
            color: #d98282;
          }

          #game-board .${InputKeysClassNames.KEY}[${KEY_VALUE_ATTRIBUTE}='6'] .${CellClassNames.ROOT} {
            color: #cfe6e6;
          }

          #game-board .${InputKeysClassNames.SEPARATOR} {
            color: #a0a0a0;
          }

          #game-board .${InputModeClassNames.ROOT} {
            color: #4d1f1f;
          }

          #game-board .${InputModeClassNames.MODE} {
            color: #fff2f2;
          }

          #game-board :checked + .${InputModeClassNames.MODE} {
            color: #d98282;
          }

          #game-board .${InputModeClassNames.ICON} {
            color: #4d1f1f;
          }

          #game-board .${InputModeClassNames.SEPARATOR} {
            color: #a0a0a0;
          }
        `}</style>
      </ComponentWrapper>
    </div>
  )
}

function ComponentWrapper(
  props: {id?: string, style?: React.CSSProperties, children: React.ReactChild | readonly React.ReactChild[]},
) {
  return (
    <div
      id={props.id}
      style={{marginBottom: '16px', border: '1px solid red', maxWidth: '100vw', maxHeight: '100vh', ...props.style}}
    >
      {props.children}
    </div>
  )
}

function getDemoGame(): HierarchicalMatrix {
  const matrix = hierarchicalCellsSelector(DEFAULT_STATE)
  Object.assign(matrix[1][1][1][1], {initialValue: null, value: null, userMarkedOptions: [1, 5, 8, 9]})
  Object.assign(matrix[0][1][2][0], {initialValue: 0, value: 9, userMarkedOptions: []})
  return matrix
}
