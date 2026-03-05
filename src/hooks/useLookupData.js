import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listAllCategories, listAllAreas, listAllIngredients } from '../services/recipeApi';
import { setAllCategories, setAllAreas, setAllIngredients } from '../store/searchSlice';

const useLookupData = () => {
    const dispatch = useDispatch();
    const { allCategories, allAreas, allIngredients } = useSelector((state) => state.search);
    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current) return;

        const fetchLookupData = async () => {
            try {
                if (allCategories.length === 0) {
                    const cats = await listAllCategories();
                    dispatch(setAllCategories(cats));
                }
                if (allAreas.length === 0) {
                    const areas = await listAllAreas();
                    dispatch(setAllAreas(areas));
                }
                if (allIngredients.length === 0) {
                    const ingredients = await listAllIngredients();
                    dispatch(setAllIngredients(ingredients));
                }
            } catch (err) {
                console.error('Failed to load lookup data', err);
            }
        };

        fetchLookupData();
        isMounted.current = true;
    }, [dispatch, allCategories.length, allAreas.length, allIngredients.length]);
};

export default useLookupData;
