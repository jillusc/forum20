import { Grid, GridItem } from "@chakra-ui/react";

function App() {
  return (
    <Grid
      templateAreas={{
        // define layout structure, naming areas within a row
        base: `"nav" "main" "footer"`,
        lg: `"nav nav nav nav"
        "aside main main empty"
        "footer footer footer footer"`, // each string represents a row
      }}
      templateColumns={{
        base: "1fr",
        lg: "22% 1fr 1fr 1fr",
      }}
    >
      <GridItem area="nav">NavBar</GridItem>

      <GridItem area="aside" hideBelow="lg">
        Aside
      </GridItem>

      <GridItem area="main">Main</GridItem>

      <GridItem area="footer">Footer</GridItem>
    </Grid>
  );
}

export default App;
