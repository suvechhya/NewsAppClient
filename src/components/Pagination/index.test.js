import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json'
import Pagination from './index';

describe('Pagination', () => {
    it('should render correctly with given props', () => {
        const blankFn = () => {};
        const component = shallow(<Pagination limit={4} selected={1} parentCallback={blankFn} />);
        expect(component).toMatchSnapshot();
    });

    it("should render correctly each time", () => {
        const blankFn = () => {};
        const tree = shallow(<Pagination limit={4} selected={1} parentCallback={blankFn} />);
        expect(toJson(tree)).toMatchSnapshot();
    });

    it('should be possible to activate page buttons with Spacebar', () => {
        const blankFn = () => {};
        const component = mount(<Pagination limit={4} selected={1} parentCallback={blankFn} />);
        component
            .find('nav')
            .childAt(1)
            .simulate('keydown', { keyCode: 32 });
        expect(component).toMatchSnapshot();
        component.unmount();
    });

    const clickFn = jest.fn();
    it('props function should be callable', () => {
        const component = mount(<Pagination limit={4} selected={1} parentCallback={clickFn} />);
        component
            .find('nav')
            .childAt(1)
            .simulate('click');
        expect(clickFn).toHaveBeenCalled();
    });
});
