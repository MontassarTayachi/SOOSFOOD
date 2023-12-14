import Chart from "react-apexcharts";
import React,{useEffect, useState } from "react";
function Barchart({name,id}) {
    const [tt, settt] = useState();
  const Ipmortdata = async () => {
    try {
      
      const response = await fetch(`http://localhost:4000/chard/`+id, {
        method: "POST"
      });
      const data = await response.json();
      console.log(data);
      settt([data[0].total_purchases,data[1].total_purchases,data[2].total_purchases,data[3].total_purchases,data[4].total_purchases,data[5].total_purchases,data[6].total_purchases]);

      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    Ipmortdata();
  }, []);
  return (
    <React.Fragment>
      <div className="container-fluid mb-5">
        <h3 className="text-center mt-3 mb-3">Bar Chart in ReactJS</h3>

        <Chart
          type="bar"
          width={1000}
          height={400}
          series={[
            {
              name: "Social Media Subscriber",
              data: tt,
            },
          ]}
          options={{
            title: {
              text: "Nomber de lat vendu  chaque jour pour la semaine",
              style: { fontSize: 30 },
            },

            subtitle: {
              text: "En Restaurant"+"  "+name,
              style: { fontSize: 18 },
            },

            
            

            xaxis: {
              tickPlacement: "on",
              categories: [
                "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi" , "dimanche"
              ],
              title: {
                text: "Restaurant "+name,
                style: { color: "#F5F5F5", fontSize: 30 },
              },
            },

            yaxis: {
              labels: {
                formatter: (val) => {
                  return `${val}`;
                },
                style: { fontSize: "15", colors: ["#F5F5F5"] },
              },
              title: {
                text: "Nombre de Plat",
                style: { color: "#F5F5F5", fontSize: 15 },
              },
            },

            legend: {
              show: true,
              position: "right",
            },

            dataLabels: {
              formatter: (val) => {
                return `${val}`;
              },
              style: {
                colors: ["#f4f4f4"],
                fontSize: 15,
              },
            },
          }}
        ></Chart>
      </div>
    </React.Fragment>
  );
}

export default Barchart;
