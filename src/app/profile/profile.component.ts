import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatService } from '../core/cat.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  breeds: any[] = [];
  selectedBreed: any = null;
  images: string[] = [];
  searchText = '';
  filteredBreeds: any[] = [];

  constructor(private catService: CatService) {}

  ngOnInit(): void {
    this.catService.getBreeds().subscribe((data) => {
      this.breeds = data;
      this.filteredBreeds = data;
    });
  }

  onSelectBreed(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const breedId = selectElement.value;

    this.selectedBreed = this.breeds.find((b) => b.id === breedId);

    this.catService.getImagesByBreed(breedId).subscribe((images) => {
      this.images = images.map((img) => img.url);
    });
  }

  filterBreeds() {
    const text = this.searchText.toLowerCase().trim();
    this.filteredBreeds = this.breeds.filter(breed =>
      breed.name.toLowerCase().includes(text)
    );
  }
}
