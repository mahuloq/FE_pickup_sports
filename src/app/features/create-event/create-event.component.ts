import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Sport } from '../../shared/models/sport';
import { SportService } from '../../core/services/sport.service';
import { EventService } from '../../core/services/event.service';
import { Event } from '../../shared/models/event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss',
})
export class CreateEventComponent implements OnInit {
  eventForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    start_date_time: new FormControl(''),
    end_date_time: new FormControl(''),
    guests: new FormControl(''),
    sportIds: new FormArray([]),
  });

  constructor(
    private sportsService: SportService,
    private eventService: EventService,
    private router: Router
  ) {}

  sports: Sport[] = [];
  selectedFile: File | null = null;

  ngOnInit(): void {
    this.loadSportsIds();
  }

  // Use this format to add genres to anime.
  addSportToForm() {
    (this.eventForm.get('sportIds') as FormArray).push(new FormControl(false));
  }

  loadSportsIds() {
    //send a get request to get all sports
    this.sportsService.getSports().subscribe({
      next: (sports: any) => {
        this.sports = sports;
        sports.forEach((sport: Sport) => {
          this.addSportToForm();
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  get sportIds(): FormArray {
    return this.eventForm.get('sportIds') as FormArray;
  }

  extractSportIds() {
    const sportIdsFormValue = this.eventForm.value.sportIds;
    const sportIds = sportIdsFormValue
      .map((checked: boolean, i: number) => {
        return checked ? this.sports[i].id : null;
      })
      .filter((id: any) => {
        return id !== null;
      });

    return sportIds;
  }

  onCreateEvent() {
    const sportIds = this.extractSportIds();

    const formData: any = new FormData();
    formData.append('title', this.eventForm.get('title')!.value);
    formData.append('content', this.eventForm.get('content')!.value);
    formData.append('guests', this.eventForm.get('guests')!.value);
    formData.append(
      'start_date_time',
      this.eventForm.get('start_date_time')!.value
    );
    formData.append(
      'end_date_time',
      this.eventForm.get('end_date_time')!.value
    );
    sportIds.forEach((sportId: any) => {
      formData.append('sport_ids[]', sportId);
    });
    formData.append('cover_image', this.selectedFile, this.selectedFile!.name);

    this.eventService.createEvent(formData).subscribe({
      next: () => {
        this.router.navigate(['/events']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
    }
  }
}
