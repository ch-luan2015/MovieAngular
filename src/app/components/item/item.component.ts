import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { IMAGES_SIZES } from 'src/app/constants/images-sizes';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() itemData: Movie | null = null;
  imagesSize = IMAGES_SIZES;
  constructor() {}

  ngOnInit(): void {
    // console.log('itemData', this.itemData);
  }
}
