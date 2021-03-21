import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';

interface messageData {
  message: String;
  type: String;
}

@Component({
  selector: 'app-message-banner',
  templateUrl: './message-banner.component.html',
  styleUrls: ['./message-banner.component.scss'],
})
export class MessageBannerComponent implements OnInit, OnChanges {
  styleObject = {};
  styleObjectXs = {};
  @Input() data: messageData;
  @Input() showItem = false;
  @Output() bannerClosed = new EventEmitter<any>();
  dataLoaded = false;
  @Input() properties;
  constructor() {}

  ngOnInit(): void {
    console.log('im initialised');
    _.set(this.styleObject, 'backgroundColor', this.properties.visualProperties.backgroundColor);
    _.set(this.styleObject, 'position', 'fixed');
    _.set(this.styleObject, 'z-index', '999');
    _.set(this.styleObjectXs, 'backgroundColor', this.properties.visualProperties.backgroundColor);
    _.set(this.styleObjectXs, 'position', 'fixed');
    _.set(this.styleObjectXs, 'z-index', '999');
    if (this.properties.visualProperties.stickyPosition === 'top') {
      _.set(this.styleObject, 'top', '0px');
      _.set(this.styleObject, '-webkit-transform', 'translate(0rem, -8rem)');
      _.set(this.styleObject, 'transform', 'translate(0rem, -8rem)');
      _.set(this.styleObjectXs, 'top', '0px');
      _.set(this.styleObjectXs, '-webkit-transform', 'translate(0rem, -14rem)');
      _.set(this.styleObjectXs, 'transform', 'translate(0rem, -14rem)');
    } else {
      _.set(this.styleObject, 'bottom', '0px');
      _.set(this.styleObject, '-webkit-transform', 'translate(0rem, 8rem)');
      _.set(this.styleObject, 'transform', 'translate(0rem, 8rem)');
      _.set(this.styleObjectXs, 'bottom', '0px');
      _.set(this.styleObjectXs, '-webkit-transform', 'translate(0rem, 14rem)');
      _.set(this.styleObjectXs, 'transform', 'translate(0rem, 14rem)');
    }
    _.set(this.styleObject, 'display', 'flex');
    _.set(this.styleObject, 'justify-content', 'center');
    _.set(this.styleObjectXs, 'display', 'flex');
    _.set(this.styleObjectXs, 'flex-direction', 'column');
    _.set(this.styleObjectXs, 'justify-content', 'center');
  }
  ngOnChanges() {
    console.log('onchages', this.showItem);
    if (this.showItem) {
      document.getElementsByClassName('sticky-banner')[0].classList.add('post-animation');
      if (this.properties.actionProperties.autoDismiss) {
        setTimeout(() => {
          this.closeBanner('dismiss');
        }, this.properties.actionProperties.autoDismissDuration);
      }
    } else {
      document.getElementById('sticky-banner-id').classList.remove('post-animation');
    }
  }
  closeBanner(event) {
    document.getElementById('sticky-banner-id').classList.remove('post-animation');
    this.bannerClosed.emit(event);
  }
}
