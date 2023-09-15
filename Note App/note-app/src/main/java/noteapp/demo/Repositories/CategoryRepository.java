package noteapp.demo.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import noteapp.demo.Entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT c FROM Category c JOIN c.notes n WHERE n.id = :noteId")
    List<Category> findCategoriesByNoteId(@Param("noteId") Long noteId);

}
