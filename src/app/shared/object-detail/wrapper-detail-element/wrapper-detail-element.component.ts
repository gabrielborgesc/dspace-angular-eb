import { Component, Injector, Input, OnInit } from '@angular/core';
import { ViewMode } from '../../../+search-page/search-options.model';
import { GenericConstructor } from '../../../core/shared/generic-constructor';
import { rendersDSOType } from '../../object-collection/shared/dso-element-decorator';
import { ListableObject } from '../../object-collection/shared/listable-object.model';

@Component({
  selector: 'ds-wrapper-detail-element',
  styleUrls: ['./wrapper-detail-element.component.scss'],
  templateUrl: './wrapper-detail-element.component.html'
})
export class WrapperGridElementComponent implements OnInit {
  @Input() object: ListableObject;
  objectInjector: Injector;

  constructor(private injector: Injector) {
  }

  ngOnInit(): void {
    this.objectInjector = Injector.create({
      providers: [{ provide: 'objectElementProvider', useFactory: () => (this.object), deps:[] }],
      parent: this.injector
    });

  }

  getDetailElement(): string {
    const f: GenericConstructor<ListableObject> = this.object.constructor as GenericConstructor<ListableObject>;
    return rendersDSOType(f, ViewMode.Detail);
  }
}
