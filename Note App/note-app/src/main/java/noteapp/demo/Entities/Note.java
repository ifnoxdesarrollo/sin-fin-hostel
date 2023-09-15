package noteapp.demo.Entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import lombok.Data;

@Entity
@Data
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;

    private String description;

    private boolean archived = false;

    @ManyToMany(mappedBy = "notes", targetEntity = Category.class)
    private List<Category> categories;

}