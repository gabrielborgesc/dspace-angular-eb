import { Component, Inject, OnInit } from '@angular/core';

import { SearchResult } from '../../search/search-result.model';
import { DSpaceObject } from '../../../core/shared/dspace-object.model';
import { AbstractListableElementComponent } from '../../object-collection/shared/object-collection-element/abstract-listable-element.component';
import { TruncatableService } from '../../truncatable/truncatable.service';
import { Observable } from 'rxjs';
import { Metadata } from '../../../core/shared/metadata.utils';
import { hasValue } from '../../empty.util';

@Component({
  selector: 'ds-search-result-grid-element',
  template: ``
})

export class SearchResultGridElementComponent<T extends SearchResult<K>, K extends DSpaceObject> extends AbstractListableElementComponent<T> implements OnInit {
  /**
   * The DSpaceObject of the search result
   */
  dso: K;

  /**
   * Whether or not the grid element is currently collapsed
   */
  isCollapsed$: Observable<boolean>;

  public constructor(protected truncatableService: TruncatableService) {
    super();
    if (hasValue(this.object)) {
      this.isCollapsed$ = this.isCollapsed();
    }
  }

  /**
   * Retrieve the dso from the search result
   */
  ngOnInit(): void {
    if (hasValue(this.object)) {
      this.dso = this.object.indexableObject;
    }
  }

  /**
   * Gets all matching metadata string values from hitHighlights or dso metadata, preferring hitHighlights.
   *
   * @param {string|string[]} keyOrKeys The metadata key(s) in scope. Wildcards are supported; see [[Metadata]].
   * @returns {string[]} the matching string values or an empty array.
   */
  allMetadataValues(keyOrKeys: string | string[]): string[] {
    return Metadata.allValues([this.object.hitHighlights, this.dso.metadata], keyOrKeys);
  }

  /**
   * Gets the first matching metadata string value from hitHighlights or dso metadata, preferring hitHighlights.
   *
   * @param {string|string[]} keyOrKeys The metadata key(s) in scope. Wildcards are supported; see [[Metadata]].
   * @returns {string} the first matching string value, or `undefined`.
   */
  firstMetadataValue(keyOrKeys: string | string[]): string {
    return Metadata.firstValue([this.object.hitHighlights, this.dso.metadata], keyOrKeys);
  }

  private isCollapsed(): Observable<boolean> {
    return this.truncatableService.isCollapsed(this.dso.id);
  }
}
