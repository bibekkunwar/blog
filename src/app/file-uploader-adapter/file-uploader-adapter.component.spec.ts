import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploaderAdapterComponent } from './file-uploader-adapter.component';

describe('FileUploaderAdapterComponent', () => {
  let component: FileUploaderAdapterComponent;
  let fixture: ComponentFixture<FileUploaderAdapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploaderAdapterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploaderAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
