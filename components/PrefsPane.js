import BtnBar from '@components/BtnBar'
import BtnWrapper from '@components/BtnWrapper'
import GroBtn from '@components/GroBtn'
import GroPane from '@components/GroPane'
import InputField from '@components/InputField'
import Label from '@components/Label'
import usePersistentState from '@hooks/usePersistentState'
import toSlugCase from '@lib/toSlugCase'
import { dequal } from 'dequal'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const ModalPanel = styled.div`
  position: absolute;
  top: 50%;
  left: 25%;
  width: 50%;
  background-color: var(--base);
  z-index: 10;
  padding: 1rem;
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.75);
`

const defaultColors = {
  accent: '#DAA52088',
  base: '#242424',
  textDefault: '#ffffff'
}

const randomColors = [
  {
    accent: '#97B55A',
    base: '#2A2021',
    textDefault: '#EDEBEE'
  },
  {
    accent: '#BA394A',
    base: '#EDEBEE',
    textDefault: '#2A2021'
  },
  {
    accent: '#c678dd',
    base: '#282c34',
    textDefault: '#abb2bf'
  },
  {
    accent: '#268BD2',
    base: '#FDF6E3',
    textDefault: '#073642'
  },
  {
    accent: '#e37933',
    base: '#0e1112',
    textDefault: '#d4d7d6'
  },
  {
    accent: '#F6B4C8',
    base: '#3D4752',
    textDefault: '#E6E6E6'
  },
  {
    accent: '#E11418',
    base: '#DBF7FF',
    textDefault: '#3E444F'
  },
  {
    accent: '#10B9A6',
    base: '#FFFFFF',
    textDefault: '#272727'
  },
  {
    accent: '#91E827',
    base: '#0A0216',
    textDefault: '#FAF9FC'
  }
]

export default function PrefsPane() {
  const [colors, setColors] = usePersistentState('themeColors', defaultColors)
  const [prefsOpen, setPrefsOpen] = useState(false)

  useEffect(() => {
    Object.keys(colors).forEach((c) =>
      document.documentElement.style.setProperty(`--${toSlugCase(c)}`, colors[c])
    )
  }, [colors])

  const onApply = (c) => setColors(c)
  const onClose = () => setPrefsOpen(false)
  const open = () => setPrefsOpen(true)

  return (
    <>
      {prefsOpen ? (
        <Prefs colors={colors} onApply={onApply} onClose={onClose} />
      ) : null}
      <GroBtn ariaLabel="Open Prefs" id="openPrefs" onClick={open}>
        PREFS
      </GroBtn>
    </>
  )
}

function Prefs(props) {
  const { colors: savedColors, onApply, onClose: close } = props
  const [colors, setColors] = useState(savedColors)

  const apply = () => {
    onApply(colors)
  }

  const rand = () => {
    // Find a new theme that is not the same as
    // the current one
    let newColors = colors
    while (dequal(newColors, colors)) {
      const randIdx = Math.floor(Math.random() * randomColors.length)
      newColors = { ...colors, ...randomColors[randIdx] }
    }
    setColors(newColors)
    onApply(newColors)
  }

  const setColorsFor = (key) => (e) =>
    setColors({ ...colors, [key]: e.target.value })

  return (
    <ModalPanel>
      <GroPane height="170px" expand>
        <Label htmlFor="base"> BASE COLOR </Label>
        <InputField id="base" value={colors.base} onChange={setColorsFor('base')} />
        <Label htmlFor="accent"> ACCENT COLOR </Label>
        <InputField
          id="accent"
          value={colors.accent}
          onChange={setColorsFor('accent')}
        />
        <Label htmlFor="textDefault"> TEXT COLOR </Label>
        <InputField
          id="textDefault"
          value={colors.textDefault}
          onChange={setColorsFor('textDefault')}
        />
        <BtnBar>
          <BtnWrapper>
            <GroBtn ariaLabel="Apply Prefs" id="applyPrefs" onClick={apply}>
              APPLY
            </GroBtn>
          </BtnWrapper>
          <BtnWrapper>
            <GroBtn ariaLabel="Randomize Colors" id="randPrefs" onClick={rand}>
              <span role="img" aria-label="random color theme">
                🎲
              </span>
            </GroBtn>
          </BtnWrapper>
          <BtnWrapper>
            <GroBtn ariaLabel="Close Prefs" id="closePrefs" onClick={close}>
              CLOSE
            </GroBtn>
          </BtnWrapper>
        </BtnBar>
      </GroPane>
    </ModalPanel>
  )
}
