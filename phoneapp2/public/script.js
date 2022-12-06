 function getData() {
         const Data = {};
         Data[x]=[];
         Data[y]=[];
         for (i=0; i <100;i++){
                Data[x][i]=+1;
                Data[y][i]=Math.random();       
         }
         return Data;
        }
const trace1 = {
        x: getData().x,
        y: getData().y,
}
const trace2 = getData();

const Data = [trace1,trace2]

const layout = {

}
 Plotly.plot('chart', [{
         y:getData(),
         type:'line'
 }]);