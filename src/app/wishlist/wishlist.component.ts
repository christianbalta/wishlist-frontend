import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {Button, ButtonDirective} from 'primeng/button';
import {CardModule} from "primeng/card";
import {TagModule} from "primeng/tag";
import {Ripple} from "primeng/ripple";

export interface WishlistItem {
  id: number;
  name: string;
  description: string;
  price: number;
  isReserved: boolean;
  link: string;
  imageLink: string;
}

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [
    NgForOf,
    Button,
    CardModule,
    ButtonDirective,
    NgIf,
    TagModule,
    Ripple,
  ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  wishlistItems: WishlistItem[] = [];
  baseUrl = 'https://remindoo.ch/api/wishlist';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.fetchWishlistItems();
  }

  fetchWishlistItems() {
    this.http.get<WishlistItem[]>(this.baseUrl)
      .subscribe(items => this.wishlistItems = items);
  }

  reserveItem(item: any) {
    this.http.put(`${this.baseUrl}/${item.id}`, {
      isReserved: !item.isReserved,
      name: item.name,
      description: item.description,
      price: item.price,
      id: item.id,
      link: item.link,
      imageLink: item.imageLink
    })
      .subscribe(() => {
        this.fetchWishlistItems();
      });
  }
}
