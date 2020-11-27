import { shallow } from 'enzyme';
import Header from './index';

describe('Header', () => {
    it('should render correctly with no props', () => {
        const component = shallow(<Header />);
        expect(component).toMatchSnapshot();
    });

    it('should have the text News atOnce', () => {
        const component = shallow(<Header />);
        expect(component.find("h1").contains("News atOnce")).toEqual(true);
    });
});
