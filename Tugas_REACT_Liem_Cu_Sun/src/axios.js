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
let Category = [
    { "data": "business" },
    { "data": "entertainment" },
    { "data": "health" }, 
    { "data": "science" },
    { "data": "sports" }, 
    { "data": "technology" }
]
let arrCategory = ""
let categoryString = "&category="

class Axios extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataKu: [],
            countryID: [],
            categoryID: []
        }
    }

    componentDidMount() {
        axios.get(URL + tempCountry[arrValue] + apiKey)
            .then((res) => {
                console.log(res)
                this.setState({ dataKu: res.data.articles })
            })
            .catch((err) => console.log(err))
        axios.get("https://newsapi.org/v2/sources?apiKey=387e91f332f345c0b8664a02b22f2c4a")
            .then((res1) => {
                console.log(res1)
                this.setState({ countryID: res1.data.sources })
            })
            .catch((err1) => console.log(err1))
        axios.get(Category)
            .then((res2) => {
                console.log(res2)
                this.setState({ categoryID: res2.data})
            })
            .catch((err1) => console.log(err1))
    }

    updateLink() {
        axios.get(URL + tempCountry[arrValue] + categoryString + Category[arrCategory] + apiKey)
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
                tempCountry.push(item.country),
                <NavDropdown.Item onClick={() => arrValue = index}>{tempCountry[index]}</NavDropdown.Item>
            )
        })
    }

    dropDownCategory = () => {
        return this.state.categoryID.map((item, index) => {
            return (
                <NavDropdown.Item onClick={() => arrCategory = index}>{item.data}</NavDropdown.Item>
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
                    <Button onClick={() => {this.updateLink()}}>OK</Button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {this.showCard()}
                </div>
            </div>
        )
    }
}

export default Axios