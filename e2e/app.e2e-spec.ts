import { TesteCliPage } from './app.po';

describe('teste-cli App', () => {
  let page: TesteCliPage;

  beforeEach(() => {
    page = new TesteCliPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
