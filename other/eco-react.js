//ecoTable
var EcoTable = React.createClass ({
    getInitialState: function(){
        return {data: []};
    },
    loadEcoData: function (){
      $.ajax({
         url: this.props.url,
         dataType: 'json',
         cache: false,
         success: function (data) {
             this.setState({data: data});
         }.bind(this),
         error: function(xhr,status,err){
             console.error(this.props.url, status, err.toString());
         }.bind(this)
      });
    },
    componentDidMount: function () {
        this.loadEcoData();
        setInterval(this.loadEcoData, this.props.pollInterval);
    },
    render: function(){
        var days=[];
        var yestTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        var todayTime = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        var tomTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

        this.state.data.eco.map(function(ecoData){
            var ecoDate = Date.parse(ecoData.date);
            if (ecoDate < todayTime) {
                ecoData.date = yestTime;
                ecoData.time = ecoDate - yestTime;
                days.yest[] = ecoData;
            } else if (ecoDate < tomTime) {
                ecoData.date = todayTime;
                ecoData.time = ecoDate - todayTime;
                days.today[] = ecoData;
            } else {
                ecoData.date = tomTime;
                ecoData.time = ecoDate - tomTime;
                days.tom[] = ecoData;
            }
        }); 

        return (
            <div className = "ecoTable">
                {this.state.data}
            </div>
        );
    }
});
var EcoDay = React.createClass ({
   render: function(){
       var ecoRows = this.props.data.map(function(datum){
           return(
                <div className = "row">
                    <EcoCell datum = {datum} />
                </div>
           );
       });
   } 
});

var EcoCell = React.createClass({
    render: function(){
        var mainClass = "col-sm-3 ecoCell";
        if (this.props.datum.today) {
            mainClass += " ecoCellToday";
        }
        return(
            <div className = {mainClass}>
                <div className = "cellTitle">{this.props.datum.country} {this.props.datum.name}</div>
                <div className = cellDate>{this.props.datum.time}</div>
                <table>
                <tr><th>Survey</th><th>Actual</th><th>Previous</th></tr>
                <tr><td>{this.props.datum.survey}</td><td>{this.props.datum.actual}</td><td>{this.props.datum.prior}</td></tr>
                </table>
            </div>
        )
    }


});
//ecoDay
//ecoRow
//ecoCell



ReactDOM.render(
  <EcoTable url="/js/data/eco.php" pollInterval={2000} />,
  document.getElementById('ecoMain')
);