import { h, Fragment, FunctionalComponent } from "preact";
import "./style.scss";

const App: FunctionalComponent<{ color?: string }> = (props) => {
	return <Fragment>
		<h1 style={{ color: props.color }}>Hello, World!</h1>
	</Fragment>;
}
export default App;
