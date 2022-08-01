var fahrenheitToCelsius=fahrenheit=>(fahrenheit-32)/1.8;
var celsiusToFahrenheit=celsius=>(celsius*9/5)+32;

class WaterBoilVerdictComp extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        if (this.props.temperature>=100)
           return(<p>The water will boil. </p>);
        else
        return(<p> The water will not boil.</p>)
    } 
}

class TemperatureInputComp extends React.Component {
    constructor(props)
    {
        super(props);
    }

    onTextChangeHandler=e=>
    {
        if (e.target.value.length==0)
         this.props.blank();
        else
        this.props.onTemperatureChange(e.target.value)
    }

    render=()=>
    {
        return (
            <fieldset>
            <legend>Enter Temperature in {this.props.unit} </legend>
            <input type="number" value={this.props.temperature} onChange={this.onTextChangeHandler} />
            </fieldset>
              )
    }
}

class TemperatureCalculatorComp extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={temperatureC: '', temperatureF: ''};
    }

    blank=()=>
    {
        this.setState({temperatureC: '', temperatureF: ''});
    }
    
    handleFahrenheitValueChange=temperatureF=>
    {
        temperatureF=Number.parseFloat(temperatureF)

        let temperatureC=fahrenheitToCelsius(Number.parseFloat(temperatureF));
        this.setState({temperatureC, temperatureF})
    }

    handleCelsiusValueChange=temperatureC=>
    {
        temperatureC=Number.parseFloat(temperatureC)
        let temperatureF= celsiusToFahrenheit(temperatureC);
        this.setState({temperatureC, temperatureF})
    }

    render=()=>
    {   

        let boilOrNot="";
        if (this.state.temperatureC!=='')
        boilOrNot=<WaterBoilVerdictComp temperature={this.state.temperatureC}/>

        return (<div>
                   <TemperatureInputComp unit={"celsius"} temperature={this.state.temperatureC} blank={this.blank} onTemperatureChange={this.handleCelsiusValueChange}/>
                   <TemperatureInputComp unit={"fahrenheit"} temperature={this.state.temperatureF} blank={this.blank} onTemperatureChange={this.handleFahrenheitValueChange}/>
                    {boilOrNot}
                   </div>
               )
    }

}

ReactDOM.render(<TemperatureCalculatorComp />, document.getElementById("myDiv"));