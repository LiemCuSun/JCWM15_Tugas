import React from 'react'
import axios from 'axios'
import Badge from 'react-bootstrap/Badge'
import {
    Card,
    Button,
    NavDropdown,
} from 'react-bootstrap'


let URL = "http://newsapi.org/v2/top-headlines?country="
let idCountry = ["id"]
let apiKey = "&apiKey=387e91f332f345c0b8664a02b22f2c4a"
let tempCountry = ["id"]
let arrValue = 0
let arrCategory = ""
let categoryString = "&category="

class Axios extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataKu: [],
            countryID: [
                "be",
                "bg",
                "br",
                "ca",
                "ch",
                "cn",
                "co",
                "cu",
                "cz",
                "de",
                "eg",
                "fr",
                "gb",
                "gr",
                "hk",
                "hu",
                "id",
                "ie",
                "il",
                "in",
                "it",
                "jp",
                "kr",
                "lt",
                "lv",
                "ma",
                "mx",
                "my",
                "ng",
                "nl",
                "no",
                "nz",
                "ph",
                "pl",
                "pt",
                "ro",
                "rs",
                "ru",
                "sa",
                "se",
                "sg",
                "si",
                "sk",
                "th",
                "tr",
                "tw",
                "ua",
                "us",
                "ve",
                "za",
            ],
            categoryID: [
                "business",
                "entertainment",
                "health",
                "science",
                "sports",
                "technology",
            ]
        }
    }

    componentDidMount() {
        axios.get(URL + this.state.countryID[arrValue] + apiKey)
            .then((res) => {
                console.log(res)
                this.setState({ dataKu: res.data.articles })
            })
            .catch((err) => console.log(err))
    }

    updateLink() {
        axios.get(URL + this.state.countryID[arrValue] + categoryString + this.state.categoryID[arrCategory] + apiKey)
            .then((res) => {
                console.log(res)
                this.setState({ dataKu: res.data.articles })
            })
            .catch((err) => console.log(err))
    }

    showCard = () => {
        return this.state.dataKu.map((item, index) => {
            return (
                <Card style={{ width: '18rem', marginRight: "25px", marginTop: "25px" }}>
                    <Card.Img variant="top" src={item.urlToImage} />
                    <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>
                            {item.description}
                        </Card.Text>
                        <Button href={item.url} variant="primary">Read More</Button>
                    </Card.Body>
                </Card>
            )
        })
    }

    dropDownCountry = () => {
        return this.state.countryID.map((item, index) => {
            return (
                <NavDropdown.Item onClick={() => arrValue = index}>{this.state.countryID[index]}</NavDropdown.Item>
            )
        })
    }

    dropDownCategory = () => {
        return this.state.categoryID.map((item, index) => {
            return (
                <NavDropdown.Item onClick={() => arrCategory = index}>{this.state.categoryID[index]}</NavDropdown.Item>
            )
        })
    }

    render() {
        // const data = this.state.dataKu.map((item, index) => {
        //     var id_title = [item.id, item.title].join(" - ");
        //     return <li key={index}>{id_title}</li>;
        // })

        console.log(this.state.dataKu)
        console.log(this.state.countryID)
        console.log(this.state.categoryID)
        console.log(`Value idCountry ${idCountry}`)

        return (
            <div>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <img alt="NEWS" src="https://www.freeiconspng.com/uploads/news-icon-24.png" width="100px" height="100px" />
                    <h1>
                        <Badge variant="Primary">VIRAL NEWS</Badge>
                    </h1>
                    <NavDropdown title="Country" id="basic-nav-dropdown">
                        {this.dropDownCountry()}
                    </NavDropdown>
                    <NavDropdown title="Category" id="basic-nav-dropdown">
                        {this.dropDownCategory()}
                    </NavDropdown>
                    <Button onClick={() => { this.updateLink() }}>OK</Button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {this.showCard()}
                </div>
            </div>
        )
    }
}

export default Axios