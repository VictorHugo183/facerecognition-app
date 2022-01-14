import React from 'react';
import './App.css';
import Particles from 'react-tsparticles';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';


const particlesConfig = {
  background: {
    color: {
      value: "#111",
    },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: false,
        mode: "push",
      },
      onHover: {
        enable: false,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: false,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 3,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 800,
      },
      /* value: 80 */
      value: 40,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
}

const initialState = {
  input: '',
  imageUrl: '',
  box: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  },
  imageFetched: true
}

class App extends React.Component{
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  /* sample url:  "https://samples.clarifai.com/face-det.jpg" */

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions;
    let boxList = []
    //boxList will be an array of all bounding box objects
    if (clarifaiFace){
      for(let i = 0; i < clarifaiFace.length; i++){
        boxList.push(clarifaiFace[i].region_info.bounding_box);
      }
      const image = document.getElementById("inputImage");
      const width = Number(image.width);
      const height = Number(image.height);
      //For each bounding box object, set their property values according to our image
      //ie. top_row is given as a percentage, so we'll multiply it by our image's height to get the top position for our bounding box
      for(let j = 0; j < boxList.length; j++){
        boxList[j].top_row = boxList[j].top_row * height;
        boxList[j].bottom_row = height - (boxList[j].bottom_row * height);
        boxList[j].left_col = boxList[j].left_col * width;
        boxList[j].right_col = width - (boxList[j].right_col * width);
      }
    }
    return boxList;
  }

  //For displaying a single bounding box, box state would also be an object and not an array.
/*   calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  } */

  displayFaceBox = (boxList) => {
    this.setState({box: boxList});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onDemoChange = (event) => {
    this.setState({input: event.target.value});
    const urlInput = document.getElementById("urlInput");
    urlInput.value = `${event.target.value}`
  }

  onButtonSubmit = () => {
    this.displayFaceBox([]); //this prevents displaying old bounding box while the new one is loading.
    this.setState({imageUrl: this.state.input});
    fetch('https://stormy-dusk-29467.herokuapp.com/imageurl', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response.outputs[0].data.regions) {
          fetch('https://stormy-dusk-29467.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log)
        }
        this.setState({imageFetched : true})
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => this.setState({imageFetched : false}));
    /* clear input state and input value of user input after clicking button */
    this.setState({input: ""});
    const urlInput = document.getElementById("urlInput");
    urlInput.value = "";
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState)
    } 
    else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render(){
    return (
      <div className="App">
        <Particles id="tsparticles"
          options={particlesConfig}
          className="particles"/>
        <Navigation isSignedIn={this.state.isSignedIn}onRouteChange={this.onRouteChange}/>
        {this.state.route === 'home' ? 
          <div>
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} onDemoChange={this.onDemoChange} imageFetched={this.state.imageFetched}/>
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
          : (
            this.state.route === 'signin' || this.state.route === 'signout' ?
              <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              :
              <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
