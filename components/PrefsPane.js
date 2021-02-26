import GroBtn from '@components/GroBtn'
import GroPane from '@components/GroPane'
import InputField from '@components/InputField'
import Label from '@components/Label'
import RowBox from '@components/RowBox'
import usePersistentState from '@hooks/usePersistentState'
import toSlugCase from '@lib/toSlugCase'
import React, { useEffect, useState } from 'react'

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

  const prefsProps = {
    colors,
    onApply,
    onClose
  }

  const growPaneProps = {
    height: '170px',
    expand: prefsOpen
  }

  const groBtnProps = {
    ariaLabel: 'Open Prefs',
    id: 'openPrefs',
    onClick: open
  }

  return (
    <GroPane {...growPaneProps}>
      {prefsOpen ? (
        <Prefs {...prefsProps} />
      ) : (
        <GroBtn {...groBtnProps}> OPEN PREFS </GroBtn>
      )}
    </GroPane>
  )
}

function Prefs(props) {
  const { colors: savedColors, onApply, onClose: close } = props
  const [colors, setColors] = useState(savedColors)

  const apply = () => {
    onApply(colors)
  }

  const rand = () => {
    const randIdx = Math.floor(Math.random() * randomColors.length)
    const newColors = { ...colors, ...randomColors[randIdx] }
    setColors(newColors)
    onApply(newColors)
  }

  const setColorsFor = (key) => (e) =>
    setColors({ ...colors, [key]: e.target.value })

  const baseInputProps = {
    id: 'base',
    value: colors.base,
    onChange: setColorsFor('base')
  }

  const accentInputProps = {
    id: 'accent',
    value: colors.accent,
    onChange: setColorsFor('accent')
  }

  const textDefaultInputProps = {
    id: 'textDefault',
    value: colors.textDefault,
    onChange: setColorsFor('textDefault')
  }

  const applyBtnProps = {
    ariaLabel: 'Apply Prefs',
    id: 'applyPrefs',
    onClick: apply
  }

  const closeBtnProps = {
    ariaLabel: 'Close Prefs',
    id: 'closePrefs',
    onClick: close
  }
  const randBtnProps = {
    ariaLabel: 'Randomize Colors',
    id: 'randPrefs',
    onClick: rand
  }

  const rowBoxProps = {
    justifyContent: 'space-between'
  }

  return (
    <>
      <Label htmlFor="base"> BASE COLOR </Label>
      <InputField {...baseInputProps} />
      <Label htmlFor="accent"> ACCENT COLOR </Label>
      <InputField {...accentInputProps} />
      <Label htmlFor="textDefault"> TEXT COLOR </Label>
      <InputField {...textDefaultInputProps} />
      <RowBox {...rowBoxProps}>
        <GroBtn {...applyBtnProps}>APPLY</GroBtn>
        <GroBtn {...randBtnProps}> ?? </GroBtn>
        <GroBtn {...closeBtnProps}>CLOSE</GroBtn>
      </RowBox>
    </>
  )
}
