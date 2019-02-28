
# HTMLFormElement <=> nested object  


``` javascript

```

## example

### HTML
```html

<form id="exmple-form">
        
        <!--input-->
        <input type="text" name="name" value="kei">
        <input type="number" name="age" value="42">
        
        <!-- radio -->
        <input name="sex" type="radio" value="man" checked>
        <input name="sex" type="radio" value="woman">
        
        <!-- select -->
        <select name="job">
            <option value="neet">neet</option>
            <option value="worker" selected>worker</option>
        </select>

        <!-- select multiple --> 
        <select name="hobby[]" multiple>
            <option value="music" selected>music</option>
            <option value="fishing">fishing</option>
            <option value="movie" selected>movie</option>
        </select>

        <input type="checkbox" name="private" value="true">
                        
        <!-- duplicate name="[name][]" to array -->
        <input name="child[]" type="text" value="taro">
        <input name="child[]" type="text" value="hanako">
        <input name="child[]" type="text" value="jiro">

        <!-- nesting parse function split= /\[\]+/ -->

        <input type="text" name="other[qustion1]" value="anser1">
        <input type="text" name="other[qustion2]" value="anser2">
        <input type="text" name="other[qustion3]" value="anser3">

        <!-- like hasMany nested -->
        <input type="text" name="other2[0][qustion1]" value="anser1">
        <input type="text" name="other2[1][qustion2]" value="anser2">
        <input type="text" name="other2[2][qustion3]" value="anser3">

    </form>


```

### script
```javascript


```

