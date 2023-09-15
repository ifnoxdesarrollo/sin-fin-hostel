package noteapp.demo.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import noteapp.demo.Entities.Category;
import noteapp.demo.Entities.Note;
import noteapp.demo.Repositories.CategoryRepository;
import noteapp.demo.Repositories.NoteRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private NoteRepository noteRepository;

    public Category createCategory(Category category) {
        try {
            return categoryRepository.save(category);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    @Transactional
    public List<Category> getAll() {

        try {
            return categoryRepository.findAll();
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }

    }

    @Transactional
    public Category getById(Long id) {
        try {
            Optional<Category> response = categoryRepository.findById(id);
            if (response.isPresent()) {
                return response.get();
            } else {
                throw new Exception("Category not found with id: " + id);
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

     @Transactional
    public List<Category> getAllNoteCategories(Long id) {
        try {
            List<Category> response = categoryRepository.findCategoriesByNoteId(id);
            if (response.isEmpty() == false) {
                return response;
            } else {
                throw new Exception("Categories not found with note id: " + id);
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    @Transactional
    public Category editCategory(Category category, Long id) {
        try {
            Optional<Category> response = categoryRepository.findById(id);
            if (response.isPresent()) {
                category.setId(id);
                return categoryRepository.save(category);
            } else {
                throw new Exception("Category not found with id: " + id);
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }

    @Transactional
    public void deleteCategory(Long id) {
        try {
            categoryRepository.deleteById(id);
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }

    @Transactional
    public void setNote(Note note, Long categoryId) {
        try {
            Optional<Category> categoryResponse = categoryRepository.findById(categoryId);

            if (categoryResponse.isPresent()) {
                categoryResponse.get().getNotes().add(note);
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }

}
