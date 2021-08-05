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
      <p><strong>
        Cílem hry je doplnit do herní mřížky čísla 1&ndash;9 tak, aby každé číslo bylo v&nbsp;každém řádku,
        v&nbsp;každém sloupci a v&nbsp;každém z devíti čtverců, ze kterých je herní mřížka složena, právě jednou.
      </strong></p>

      <h1>Zápis čísel do mřížky</h1> 

      <p>
        Pro zadání čísla je potřeba označit buňku, do které chcete číslo vložit, a zvolit příslušnou číslici
        v&nbsp;řadě pod herní mřížkou. Při hře na počítači lze využít také fyzickou klávesnici.
      </p>
      <p>
        Čísla lze zadávat ve dvou různých módech, mezi kterými se lze přepínat pomocí ikon pod číselnou řadou.
      </p>

      <h2>Zápis kandidátů</h2>

      <p>
        Pokud pro určitou buňku existuje právě jedno možné číslo, které do ní lze doplnit, aby splňovalo výše popsaná
        pravidla, zapisuje se jako tzv. kandidát. Mód pro zápis kandidátů se aktivuje pomocí první ikony (označené
        číslicí „1“) v&nbsp;trojici ikon pro přepínání módů. V&nbsp;nastavení hry lze zvolit, zda se má správnost
        kandidátů kontrolovat automaticky. Pokud je tato kontrola aktivní, do mřížky nelze zapsat číslo, které už se
        v&nbsp;příslušném řádku, sloupci či čtverci jednou nachází. 
      </p>

      <h2>Zápis poznámek</h2>

      <p>
        Mód poznámek slouží k&nbsp;zaznamenání více možných kandidátů v&nbsp;případě, kdy zatím nelze pro danou buňku
        jednoznačně určit finálního kandidáta. Do každé buňky lze vepsat až devět různých hodnot. Mód pro zápis
        poznámek se aktivuje pomocí prostřední ikony v&nbsp;trojici ikon pro přepínání módů. V&nbsp;nastavení hry lze
        zvolit, zda se mají poznámky automaticky aktualizovat na základě kandidátů vyplněných do ostatních buněk.
      </p>

      <h2>Mazání kandidátů a poznámek</h2>

      <p>
        Zapsané kandidáty i poznámky lze mazat přepnutím do módu pro mazání, který se aktivuje pomocí třetí ikony
        (označené obrázkem gumy) v&nbsp;trojici ikon pro přepínání módů, případně označením příslušné buňky a opětovným
        zvolením číslice, která má být smazána.
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
