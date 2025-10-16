// var yourVlSpec = {
//   $schema: "https://vega.github.io/schema/vega-lite/v5.json",
//   description: "A simple bar chart with embedded data.",
//   data: {
//     values: [
//       { a: "A", b: 28 },
//       { a: "B", b: 55 },
//       { a: "C", b: 43 },
//       { a: "D", b: 91 },
//       { a: "E", b: 81 },
//       { a: "F", b: 53 },
//       { a: "G", b: 19 },
//       { a: "H", b: 87 },
//       { a: "I", b: 52 },
//     ],
//   },
//   mark: "bar",
//   encoding: {
//     x: { field: "a", type: "ordinal" },
//     y: { field: "b", type: "quantitative" },
//   },
// };



// vegaEmbed("#view2", yourVlSpec);

async function render() {
  // load data
  const data = await d3.csv("./data/videogames_wide.csv");
  const dataLong = await d3.csv("./data/videogames_long.csv");

    // ONE
    const vlSpecOne = vl
    .markBar()
    .data(data)
    .encode(
      vl.y().fieldQ("Global_Sales").title("Total Sales"),
      vl.x().fieldN("Genre"),
      vl.color().fieldN("Platform"),
      vl.tooltip([
        { field: "Genre", type: "nominal" },
        { field: "Platform", type: "nominal" }
      ])
    )
    .width("container")
    .height(600)
    .toSpec();

    
    // TWO
    const vlSpecTwo = vl
    .layer(
      vl.markCircle()
      .data(data)
      .encode(
        vl.y().fieldN("Platform"),
        vl.x().fieldT("Year").axis({ format: '%Y' }),
        vl.size().fieldQ("Global_Sales").title("Total Sales").aggregate("sum"),
        vl.tooltip([
          { field: "Platform", type: "nominal"},
          { field: "Genre", type: "nominal" },
          { field: "Year", type: "temporal", format: "%Y" }
        ])
      ),
    )
    .width("container")
    .height(400)
    .toSpec()

    const vlSpecTwoAgain = vl
    .markCircle()
    .data(data)
    .encode(
      vl.size().fieldQ("Global_Sales").title("Total Sales").aggregate("sum"),
      vl.y().fieldN("Genre"),
      vl.color().fieldN("Genre"),
      vl.x().fieldT("Year").axis({ format: '%Y' }),
      vl.tooltip([
          { field: "Platform", type: "nominal"},
          { field: "Genre", type: "nominal" },
          { field: "Year", type: "temporal", format: "%Y" }
        ])
    )
    .width("container")
    .height(400)
    .toSpec()

    // THREE
    const vlSpecThree = vl
    .markCircle()
    .data(dataLong)
    .encode(
      vl.y().fieldN("sales_region").title("Sales Region"),
      vl.x().fieldN("platform").title("Platform"),
      vl.color().fieldQ("sales_amount").aggregate("sum").title("Total Sales"),
      vl.size().fieldQ("sales_amount").aggregate("sum"),
      vl.tooltip([
        { field: "platform", type: "nominal", title: "Platform" },
        { field: "sales_amount", type: "quantitative", aggregate: "sum", title: "Sales"}
      ])

    )
    .width("container")
    .height(400)
    .toSpec();

    // FOUR
    const vlSpecFour = vl
    .markBar()
    .data(data)
    .encode(
      vl.y().fieldQ("Global_Sales").title("Sales"),
      vl.x().fieldN("Publisher").sort({ 
        op: "sum",          
        field: "Global_Sales", 
        order: "descending" 
      }),
      vl.tooltip([
        { field: "Publisher", type: "nominal"},
        { field: "Global_Sales", type: "quantitative", title: "Sales", aggregate: "mean"},
      ]),
    )
    .transform(
      vl.filter("datum['Global_Sales'] >= 6")
    )
    .width("container")
    .height(400)
    .toSpec();

    const vlSpecFive = vl
    .markBar()
    .data(data)
    .transform(
      vl.filter("datum.Publisher === 'Nintendo'")
    )
    .encode(
      vl.y().fieldQ("Global_Sales").title("Sales"),
      vl.x().fieldN("Name").sort("-y"),
      vl.color().field("Genre"),
      vl.tooltip([
        { field: "Name", type: "nominal"},
        { field: "Global_Sales", type: "quantitative", aggregate: "sum", title: "Sales"},
        {field: "Genre", type: "nominal", title: "Platform" },
      ]),
    )
    .transform(
      vl.filter("datum['Global_Sales'] >= 20")
    )
    .width("container")
    .height(400)
    .toSpec();


    const view = await vegaEmbed("#v1", vlSpecOne).view;
    const view2 = await vegaEmbed("#v2", vlSpecTwo).view2;
    const view2c = await vegaEmbed("#v2c", vlSpecTwoAgain).view2c;
    const view3 = await vegaEmbed("#v3", vlSpecThree).view3;
    const view4 = await vegaEmbed("#v4", vlSpecFour).view4;
    const view5 = await vegaEmbed("#v5", vlSpecFive).view5;
    
    view.run();
    view2.run();
    view2c.run();
    view3.run();
    view4.run();
    view5.run();

}



render();


