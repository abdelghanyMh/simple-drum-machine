import React from 'react'
import './style.sass'

const drums = [
  {
    "name": "80s-CRASH1",
    "url": "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/80s%20Drum%20Machine/87[kb]80s-CRASH1.wav.mp3",
    "keytrigger": "Q"
  },
  {
    "name": "80s-CRASH2",
    "url": "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/80s%20Drum%20Machine/98[kb]80s-CRASH2.wav.mp3",
    "keytrigger": "W"
  },
  {
    "name": "80s-CRASH3",
    "url": "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/80s%20Drum%20Machine/77[kb]80s-CRASH3.wav.mp3",
    "keytrigger": "E"
  },
  {
    "name": "80s-TOM3",
    "url": "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/80s%20Drum%20Machine/26[kb]80s-TOM3.wav.mp3",
    "keytrigger": "A"
  },
  {
    "name": "80s-TOM2",
    "url": "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/80s%20Drum%20Machine/19[kb]80s-TOM2.wav.mp3",
    "keytrigger": "S"
  },
  {
    "name": "80s-TOM1",
    "url": "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/80s%20Drum%20Machine/19[kb]80s-TOM1.wav.mp3",
    "keytrigger": "D"
  },
  {
    "name": "80s-HICONGA",
    "url": "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/80s%20Drum%20Machine/13[kb]80s-HICONGA.wav.mp3",
    "keytrigger": "Z"
  },
  {
    "name": "80s-LOWCONGA",
    "url": "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/80s%20Drum%20Machine/20[kb]80s-LOWCONGA.wav.mp3",
    "keytrigger": "X"
  },
  {
    "name": "80s-MIDCONGA",
    "url": "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/DRUM%20MACHINES/80s%20Drum%20Machine/14[kb]80s-MIDCONGA.wav.mp3",
    "keytrigger": "C"
  }
]
class Drums extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDisplay: ""
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handelEvent)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handelEvent)
  }

  playsound = (id) => {
    const audio = document.getElementById(id)
    if (audio != null) {
      audio.currentTime = 0
      audio.play()
    }
  }

  handelEvent = (e) => {
    if (e.type === "click") {
      this.setState({ currentDisplay: e.currentTarget.id })
      this.playsound(e.currentTarget.dataset.keytrigger)
      this.animate(e.currentTarget.id)
    }
    else if (e.type === "keydown") {
      this.playsound(e.key.toUpperCase())
      let drum = drums.filter(drum => drum.keytrigger == e.key.toUpperCase())

      if (drum != false) {
        this.setState({ currentDisplay: drum[0].name })
        this.animate(drum[0].name)

      }
    }

  }

  animate(id) {
    const button = document.getElementById(id)

    button.style.backgroundColor = "#FFBA08"
    button.style.boxShadow = " white 0px 15px 20px, rgba(0, 0, 0, 0.12) 0px -12px 20px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"

    setTimeout(() => {
      button.style.backgroundColor = "Transparent"
      button.style.boxShadow = "none"
    }, 100)
  }

  render() {

    return (
      <div id="drum-machine">
        <div className='pad-bank' >
          {
            drums.map(drum => {
              return <Drum
                name={drum.name}
                handelClick={this.handelEvent}
                keytrigger={drum.keytrigger}
                url={drum.url}
              />

            }
            )
          }
        </div>
        <div id="display">Drum name :{this.state.currentDisplay}</div>

      </div>
    )
  }
}

class Drum extends React.Component {
  render() {
    return (
      <button
        id={this.props.name}
        className="drum-pad"
        key={this.props.name}
        onClick={this.props.handelClick}
        data-keytrigger={this.props.keytrigger}
      >
        <audio
          id={this.props.keytrigger}
          src={this.props.url}
        >
        </audio>
        {this.props.keytrigger}
      </button>
    )
  }
}

export default Drums
