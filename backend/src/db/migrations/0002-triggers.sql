-- [AvailableSlots] Prevent restaurants from creating overlapping available slots.
CREATE OR REPLACE FUNCTION f_check_slot_overlap() RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM AvailableSlots A
    WHERE A.username = NEW.username AND A.day_of_week = NEW.day_of_week
      AND A.start_time <= NEW.end_time AND A.end_time >= NEW.start_time
  ) THEN
    RAISE NOTICE 'Available slot overlaps with another slot.';
    RETURN NULL;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER t_check_slot_overlap BEFORE INSERT OR UPDATE ON AvailableSlots
FOR EACH ROW EXECUTE FUNCTION f_check_slot_overlap();

-- [Bookings] Ensure that confirmed bookings do not exceed restaurant capacity at any moment.
CREATE OR REPLACE FUNCTION f_check_pax_count() RETURNS TRIGGER AS $$
DECLARE count integer;
BEGIN
  IF NEW.is_confirmed = FALSE THEN RETURN NEW; END IF;
  SELECT SUM(pax) INTO count FROM Bookings B
  WHERE B.dusername = NEW.dusername AND B.is_confirmed = TRUE
    AND B.booking_date = NEW.booking_date AND B.start_time = NEW.start_time;
  IF count + NEW.pax > (
    SELECT R.capacity FROM Restaurants R WHERE R.username = NEW.rusername
  ) THEN
    RAISE NOTICE 'Restaurant capacity exceeded.';
    RETURN NULL;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER t_check_pax_count BEFORE INSERT OR UPDATE ON Bookings
FOR EACH ROW EXECUTE FUNCTION f_check_pax_count();

-- [Reviews] Prevent diners from reviewing a restaurant if he has not dined at the restaurant before.
CREATE OR REPLACE FUNCTION f_check_reviewable() RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM Bookings B
    WHERE B.dusername = NEW.dusername
      AND B.rusername = NEW.rusername
      AND B.is_confirmed = True
  ) THEN RETURN NEW;
  ELSE
    RAISE NOTICE 'No previous confirmed booking found for review.';
    RETURN NULL;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER t_check_reviewable BEFORE INSERT OR UPDATE ON Reviews
FOR EACH ROW EXECUTE FUNCTION f_check_reviewable();
