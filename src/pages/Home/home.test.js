import { shallow } from 'enzyme';
import SearchBar from './Searchbar';

describe('SearchBar', () => {

    it('SearchBar should render correctly with props', () => {
        const clickFn = jest.fn();
        const component = shallow(<SearchBar title={'Test'} searchKeyword={clickFn} />);
        expect(component).toMatchSnapshot();
    });

    it('should have the text News atOnce', () => {
        const clickFn = jest.fn();
        const component = shallow(<SearchBar title={'Test'} searchKeyword={clickFn} />);
        expect(component.childAt(0).contains("Test")).toEqual(true);
    });
});
