import path from 'path';
import chromedriver from 'chromedriver';
import webdriver from 'selenium-webdriver';
import { expect } from 'chai';
import electronPath from 'electron-prebuilt';
import homeStyles from '../app/components/Home.css';
import counterStyles from '../app/components/Counter.css';

chromedriver.start(); // on port 9515
process.on('exit', chromedriver.stop);

describe('main window', () => {

});
