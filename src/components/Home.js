import React, { Component } from 'react'
import NavBar from './NavBar'
import PaperText from './PaperText'
import SearcherTrigger from './SearcherTrigger'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import User from 'material-ui/svg-icons/social/person'

var FontAwesome = require('react-fontawesome')

const styles = {
  user: {
    color: 'white',
    height: 50,
    width: 30
  }
}

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { scrolled: false }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.isScrolled)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.isScrolled)
  }

  goForm = () => {
    this.context.router.push('/form')
  }

  isScrolled = () => {
    if (window.scrollY > 220) {
      this.setState({ scrolled: true })
    }
    else {
      this.setState({ scrolled: false })
    }
  }

  render() {
    let isScrolled = this.state.scrolled
    return (
      <div className="home__wrapper">
        <div className={(isScrolled) ? 'sticky__searcher visible' : 'sticky__searcher'} onClick={() => { this.goForm() }}>Buscar profesionales
          <FontAwesome name="search" />
        </div>
        <NavBar
          key={'navbar__home'}
          title="Habitissimo"
          iconleft={<IconButton><NavigationMenu /></IconButton>}
          iconright={<User style={styles.user} />}>
        </NavBar>
        <main className="home__main">
          <SearcherTrigger></SearcherTrigger>
          <PaperText title="Directorio de empresas y reformas" text="Encuentra en el Directorio de Empresas de habitissimo a los mejores profesionales, empresas y tiendas en España para reformas y servicios para el hogar. Busca entre más de 94.000 profesionales de la construcción, reformas,mudanzas, arquitectos y más."></PaperText>
          <div className="categories">
            <div className="categories__title">Categorías destacadas</div>
            <div className="horizontal-scroll__wrapper">
              <div>
                <PaperText text="Construcción"></PaperText>
              </div>
              <div>
                <PaperText text="Reformas de la vivienda"></PaperText>
              </div>
              <div>
                <PaperText text="Interiorismo"></PaperText>
              </div>
              <div>
                <PaperText text="Fontaneria"></PaperText>
              </div>
              <div>
                <PaperText text="Electricidad"></PaperText>
              </div>
            </div>
          </div>
          <div className="fake__content">
            <div className="img img2"></div>
            <div className="img img3"></div>
            <div className="img img4"></div>
            <div className="img img5"></div>
            <div className="img img6"></div>
            <div className="img img7"></div>
            <div className="img img8"></div>
          </div>
        </main>
      </div>
    )
  }
}

Home.contextTypes = {
  router: React.PropTypes.object
}
