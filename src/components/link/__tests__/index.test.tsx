import React from 'react';
import { mount } from 'enzyme';
import { Link } from 'components';

describe('Link', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <div>
        <Link href="https://himalaya-ui.com">link</Link>
        <Link href="https://himalaya-ui.com" color>
          link
        </Link>
        <Link href="https://himalaya-ui.com" icon>
          link
        </Link>
        <Link href="https://himalaya-ui.com" underline>
          link
        </Link>
        <Link href="https://himalaya-ui.com" block>
          link
        </Link>
      </div>,
    );
    expect(wrapper.html()).toMatchSnapshot();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should be no errors when href missing', () => {
    const errorSpy = jest.spyOn(console, 'error');
    const wrapper = mount(<Link />);
    expect(errorSpy).not.toHaveBeenCalled();
    expect(() => wrapper.unmount()).not.toThrow();
    errorSpy.mockRestore();
  });

  it('should forward ref', () => {
    let ref = React.createRef<HTMLAnchorElement>();
    const errorSpy = jest.spyOn(console, 'error');
    const wrapper = mount(<Link ref={ref} />);

    expect(errorSpy).not.toHaveBeenCalled();
    expect(ref.current).not.toBeNull();
    expect(() => wrapper.unmount()).not.toThrow();
    errorSpy.mockRestore();
  });

  it('an warning should be thrown when using the pure prop', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mount(<Link pure />);
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
