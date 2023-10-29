import React from 'react';
import { render } from 'enzyme';
import { CssBaseline, ConfigProvider } from 'components';

describe('CSSBaseline', () => {
  it('should render correctly', () => {
    const wrapper = render(
      <ConfigProvider>
        <CssBaseline />
      </ConfigProvider>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render dark mode correctly', () => {
    const wrapper = render(
      <ConfigProvider themeType="dark">
        <CssBaseline />
      </ConfigProvider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
