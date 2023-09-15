package noteapp.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import noteapp.demo.Entities.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {

}